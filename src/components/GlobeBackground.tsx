import { useEffect, useRef, useCallback, useState } from 'react';
import * as THREE from 'three';

interface City {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

const CITIES: City[] = [
  { name: 'Kilifi', lat: -3.63, lng: 39.85, color: '#0084ff' },
  { name: 'London', lat: 51.51, lng: -0.13, color: '#0084ff' },
  { name: 'Dubai', lat: 25.2, lng: 55.27, color: '#1d8c89' },
  { name: 'Johannesburg', lat: -26.2, lng: 28.04, color: '#1ea6ff' },
  { name: 'Mumbai', lat: 19.08, lng: 72.88, color: '#1d8c89' },
  { name: 'Cairo', lat: 30.04, lng: 31.24, color: '#0084ff' },
  { name: 'New York', lat: 40.71, lng: -74.01, color: '#1ea6ff' },
  { name: 'Singapore', lat: 1.35, lng: 103.82, color: '#1d8c89' },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  altitude: number,
  segments = 64
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const radius = start.length();

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().lerpVectors(start, end, t);
    const elevation = 1 + altitude * Math.sin(t * Math.PI);
    point.normalize().multiplyScalar(radius * elevation);
    points.push(point);
  }
  return points;
}

interface ElectronArc {
  line: THREE.Line;
  dot: THREE.Mesh;
  glow: THREE.Mesh;
  fromVec: THREE.Vector3;
  toVec: THREE.Vector3;
  progress: number;
  speed: number;
  arcHeight: number;
  active: boolean;
}

export function GlobeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    globe: THREE.Mesh | null;
    electronArcs: ElectronArc[];
    cityMarkers: THREE.Group;
    rafId: number;
    isDragging: boolean;
    prevMouse: { x: number; y: number };
    rotationY: number;
    rotationX: number;
    autoSpeed: number;
    time: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    globe: null,
    electronArcs: [],
    cityMarkers: new THREE.Group(),
    rafId: 0,
    isDragging: false,
    prevMouse: { x: 0, y: 0 },
    rotationY: 0,
    rotationX: 0.3,
    autoSpeed: 0.0008,
    time: 0,
  });

  const setupScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
        failIfMajorPerformanceCaveat: false,
      });
      if (!renderer.getContext()) {
        renderer.dispose();
        setWebglFailed(true);
        return;
      }
    } catch {
      setWebglFailed(true);
      return;
    }

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
    camera.position.z = 5;

    const radius = 1.9;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x0084ff, 2, 20);
    pointLight.position.set(-5, 2, 5);
    scene.add(pointLight);

    const globeGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://unpkg.com/three-globe/example/img/earth-night.jpg'
    );
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      transparent: true,
      opacity: 0.9,
      shininess: 25,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.015, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.0, 0.52, 1.0, 1.0) * intensity * 0.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const wireframeGeometry = new THREE.SphereGeometry(radius * 1.002, 36, 18);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globe.add(wireframe);

    const cityMarkers = new THREE.Group();
    globe.add(cityMarkers);

    CITIES.forEach((city) => {
      const pos = latLngToVector3(city.lat, city.lng, radius * 1.005);

      const dotGeometry = new THREE.SphereGeometry(0.025, 16, 16);
      const dotMaterial = new THREE.MeshBasicMaterial({ color: city.color });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.copy(pos);
      cityMarkers.add(dot);

      const glowGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: city.color,
        transparent: true,
        opacity: 0.3,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(pos);
      cityMarkers.add(glow);

      const ringGeometry = new THREE.RingGeometry(0.03, 0.045, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: city.color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0));
      cityMarkers.add(ring);
    });

    // ── Electron arcs — random connections spiking across the globe ──
    interface ElectronArc {
      line: THREE.Line;
      dot: THREE.Mesh;
      glow: THREE.Mesh;
      fromVec: THREE.Vector3;
      toVec: THREE.Vector3;
      progress: number;
      speed: number;
      arcHeight: number;
      active: boolean;
    }

    const electronArcs: ElectronArc[] = [];
    const ELECTRON_COUNT = 18;

    const randomPointOnGlobe = (r: number) => {
      const lat = (Math.random() - 0.5) * 160;
      const lng = Math.random() * 360 - 180;
      return latLngToVector3(lat, lng, r);
    };

    for (let i = 0; i < ELECTRON_COUNT; i++) {
      const fromVec = randomPointOnGlobe(radius * 1.005);
      const toVec = randomPointOnGlobe(radius * 1.005);
      const arcHeight = 0.08 + Math.random() * 0.2;
      const arcPoints = createArcPoints(fromVec, toVec, arcHeight, 64);

      const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
      const arcMaterial = new THREE.LineBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.15,
        linewidth: 1,
      });
      const arcLine = new THREE.Line(arcGeometry, arcMaterial);
      globe.add(arcLine);

      const dotGeo = new THREE.SphereGeometry(0.018, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.9 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      globe.add(dot);

      const glowGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0.4 });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      globe.add(glow);

      electronArcs.push({
        line: arcLine,
        dot,
        glow,
        fromVec,
        toVec,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.006,
        arcHeight,
        active: true,
      });
    }

    stateRef.current.renderer = renderer;
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;
    stateRef.current.globe = globe;
    stateRef.current.electronArcs = electronArcs;
    stateRef.current.cityMarkers = cityMarkers;

    const handleResize = () => {
      const w2 = container.clientWidth;
      const h2 = container.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.prevMouse = { x: e.clientX, y: e.clientY };
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.prevMouse.x;
      const dy = e.clientY - stateRef.current.prevMouse.y;
      stateRef.current.rotationY += dx * 0.005;
      stateRef.current.rotationX += dy * 0.005;
      stateRef.current.rotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, stateRef.current.rotationX));
      stateRef.current.prevMouse = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      stateRef.current.isDragging = true;
      stateRef.current.prevMouse = { x: t.clientX, y: t.clientY };
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!stateRef.current.isDragging || !e.touches[0]) return;
      const t = e.touches[0];
      const dx = t.clientX - stateRef.current.prevMouse.x;
      const dy = t.clientY - stateRef.current.prevMouse.y;
      stateRef.current.rotationY += dx * 0.005;
      stateRef.current.rotationX += dy * 0.005;
      stateRef.current.rotationX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, stateRef.current.rotationX));
      stateRef.current.prevMouse = { x: t.clientX, y: t.clientY };
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    renderer.domElement.addEventListener('touchmove', handleTouchMove, { passive: true });
    renderer.domElement.addEventListener('touchend', handleMouseUp);

    const animate = () => {
      stateRef.current.time += 0.016;
      const s = stateRef.current;

      if (!s.isDragging) {
        s.rotationY += s.autoSpeed;
      }

      if (s.globe) {
        s.globe.rotation.y = s.rotationY;
        s.globe.rotation.x = s.rotationX;
      }

      cityMarkers.children.forEach((child, idx) => {
        if ((child as THREE.Mesh).material && 'opacity' in (child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          if (mat.opacity < 1 && mat.opacity > 0) {
            const pulse = 0.3 + Math.sin(s.time * 3 + idx * 0.5) * 0.2;
            mat.opacity = pulse;
          }
        }
      });

      s.electronArcs.forEach((ea) => {
        ea.progress += ea.speed;
        if (ea.progress >= 1) {
          ea.progress = 0;
          ea.fromVec = randomPointOnGlobe(radius * 1.005);
          ea.toVec = randomPointOnGlobe(radius * 1.005);
          ea.arcHeight = 0.08 + Math.random() * 0.2;
          const newPoints = createArcPoints(ea.fromVec, ea.toVec, ea.arcHeight, 64);
          ea.line.geometry.dispose();
          ea.line.geometry = new THREE.BufferGeometry().setFromPoints(newPoints);
        }

        const t = ea.progress;
        const mid = new THREE.Vector3().lerpVectors(ea.fromVec, ea.toVec, 0.5);
        mid.normalize().multiplyScalar(ea.fromVec.length() * (1 + ea.arcHeight * Math.sin(t * Math.PI)));

        const pos = new THREE.Vector3();
        pos.x = (1 - t) * (1 - t) * ea.fromVec.x + 2 * (1 - t) * t * mid.x + t * t * ea.toVec.x;
        pos.y = (1 - t) * (1 - t) * ea.fromVec.y + 2 * (1 - t) * t * mid.y + t * t * ea.toVec.y;
        pos.z = (1 - t) * (1 - t) * ea.fromVec.z + 2 * (1 - t) * t * mid.z + t * t * ea.toVec.z;

        ea.dot.position.copy(pos);
        ea.glow.position.copy(pos);

        const pulse = 0.6 + Math.sin(s.time * 8 + ea.progress * 10) * 0.3;
        (ea.dot.material as THREE.MeshBasicMaterial).opacity = pulse;
        (ea.glow.material as THREE.MeshBasicMaterial).opacity = pulse * 0.5;

        const lineMat = ea.line.material as THREE.LineBasicMaterial;
        lineMat.opacity = 0.08 + Math.sin(s.time * 2 + ea.progress * 5) * 0.06;
      });

      if (s.renderer && s.scene && s.camera) {
        s.renderer.render(s.scene, s.camera);
      }
      s.rafId = requestAnimationFrame(animate);
    };

    stateRef.current.rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(stateRef.current.rafId);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      renderer.domElement.removeEventListener('touchmove', handleTouchMove);
      renderer.domElement.removeEventListener('touchend', handleMouseUp);

      stateRef.current.electronArcs.forEach((ea) => {
        ea.line.geometry.dispose();
        (ea.line.material as THREE.Material).dispose();
        ea.dot.geometry.dispose();
        (ea.dot.material as THREE.Material).dispose();
        ea.glow.geometry.dispose();
        (ea.glow.material as THREE.Material).dispose();
      });
      globeGeometry.dispose();
      globeMaterial.dispose();
      earthTexture.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      stateRef.current.renderer = null;
      stateRef.current.scene = null;
      stateRef.current.camera = null;
      stateRef.current.globe = null;
      stateRef.current.electronArcs = [];
    };
  }, []);

  useEffect(() => {
    const cleanup = setupScene();
    return cleanup;
  }, [setupScene]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,132,255,0.08) 0%, rgba(0,132,255,0.03) 40%, transparent 65%)',
        }}
      />
      {webglFailed && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,520px)] h-[min(70vw,520px)] rounded-full opacity-40 animate-pulse"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, rgba(0,132,255,0.15) 0%, rgba(10,26,37,0.4) 50%, transparent 70%)',
            boxShadow: 'inset 0 0 80px rgba(0,132,255,0.12)',
          }}
          aria-hidden
        />
      )}
      {!webglFailed && (
        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          style={{ pointerEvents: 'auto' }}
        />
      )}
    </div>
  );
}
