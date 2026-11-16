import { spawn } from 'node:child_process';

const php = spawn('php', ['-S', '127.0.0.1:8000', '-t', 'public'], { stdio: 'inherit' });
let vite;
let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  vite?.kill('SIGTERM');
  php.kill('SIGTERM');
  process.exitCode = code;
}

php.once('error', (error) => {
  console.error(`Could not start the local PHP contact endpoint: ${error.message}`);
  shutdown(1);
});
php.once('exit', (code) => {
  if (!shuttingDown) {
    console.error(`Local PHP contact endpoint exited (${code ?? 'signal'}).`);
    shutdown(code || 1);
  }
});

setTimeout(() => {
  if (shuttingDown) return;
  vite = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: process.platform === 'win32' });
  vite.once('error', (error) => {
    console.error(`Could not start Vite: ${error.message}`);
    shutdown(1);
  });
  vite.once('exit', (code) => shutdown(code || 0));
}, 300);

process.once('SIGINT', () => shutdown(0));
process.once('SIGTERM', () => shutdown(0));
