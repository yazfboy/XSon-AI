import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroWarpCanvasProps {
  typingPulseKey: number;
  warpTriggerKey: number;
  accentHex?: string;
  secondaryHex?: string;
}

export const HeroWarpCanvas: React.FC<HeroWarpCanvasProps> = ({
  typingPulseKey,
  warpTriggerKey,
  accentHex = '#4F46E5',
  secondaryHex = '#059669',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const typingPulseRef = useRef<number>(0);
  const warpVelocityRef = useRef<number>(0);
  const targetAccentColorRef = useRef<THREE.Color>(new THREE.Color(accentHex));
  const targetSecondaryColorRef = useRef<THREE.Color>(new THREE.Color(secondaryHex));
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Trigger subtle kinetic wave on every keystroke in Brand Name or Description
  useEffect(() => {
    if (typingPulseKey > 0) {
      typingPulseRef.current = Math.min(typingPulseRef.current + 0.65, 2.2);
    }
  }, [typingPulseKey]);

  // Trigger 0.8s Warp-Speed surge when user clicks "Kiểm tra tên này" or Quick-Test Preset
  useEffect(() => {
    if (warpTriggerKey > 0) {
      warpVelocityRef.current = 14.0;
      typingPulseRef.current = 2.0;
    }
  }, [warpTriggerKey]);

  useEffect(() => {
    targetAccentColorRef.current.set(accentHex);
    targetSecondaryColorRef.current.set(secondaryHex);
  }, [accentHex, secondaryHex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software-WebGL guard per threejs skill directive
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 240);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0xF8FAFC, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xF8FAFC, 0.028);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 120);
    camera.position.set(0, 0.6, 14);

    // 1. 3D Warp-Speed Constellation Particles (Indigo / Slate / Emerald on Light Canvas)
    const starCount = 340;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const cIndigo = new THREE.Color('#4F46E5');
    const cSlate = new THREE.Color('#475569');
    const cSecondary = new THREE.Color(secondaryHex);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 2.2 + Math.random() * 18;
      const angle = Math.random() * Math.PI * 2;
      starPositions[i3] = Math.cos(angle) * radius;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 10;
      starPositions[i3 + 2] = (Math.random() - 0.85) * 48;

      const mixColor = i % 4 === 0 ? cSecondary : i % 2 === 0 ? cIndigo : cSlate;
      starColors[i3] = mixColor.r;
      starColors[i3 + 1] = mixColor.g;
      starColors[i3 + 2] = mixColor.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.58,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // 2. Neural Tunnel Grid Lines (Subtle Indigo/Slate Horizon Grid on Light Canvas)
    const gridGroup = new THREE.Group();
    const gridLineCount = 24;
    const gridPositions: number[] = [];

    for (let i = -gridLineCount / 2; i <= gridLineCount / 2; i++) {
      const x = i * 1.4;
      gridPositions.push(x, -3.2, -38, x, -3.2, 16);
      gridPositions.push(x, 3.6, -38, x, 3.6, 16);
    }
    for (let z = -36; z <= 14; z += 3.5) {
      const halfSpan = (gridLineCount / 2) * 1.4;
      gridPositions.push(-halfSpan, -3.2, z, halfSpan, -3.2, z);
    }

    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridPositions, 3));
    const gridMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#6366F1'),
      transparent: true,
      opacity: 0.11,
    });
    const gridLines = new THREE.LineSegments(gridGeo, gridMat);
    gridGroup.add(gridLines);
    scene.add(gridGroup);

    // 3. Composite Multi-Part 3D Neural Core
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0.2, -6);

    const outerRingGeo = new THREE.TorusGeometry(4.2, 0.025, 12, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#4F46E5'),
      transparent: true,
      opacity: 0.18,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    coreGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(2.7, 0.02, 10, 48);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#64748B'),
      transparent: true,
      opacity: 0.16,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 3;
    coreGroup.add(innerRing);

    const icoGeo = new THREE.IcosahedronGeometry(1.55, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#4F46E5'),
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    scene.add(coreGroup);

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointerRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 320);
      const h = Math.max(container.clientHeight, 240);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    const startTime = lastTime;
    let frameId = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (isDisposed) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Exponentially damp warp velocity & typing pulse
      warpVelocityRef.current = THREE.MathUtils.damp(warpVelocityRef.current, 0, 3.2, dt);
      typingPulseRef.current = THREE.MathUtils.damp(typingPulseRef.current, 0, 4.5, dt);

      const speed = 1.4 + warpVelocityRef.current * 2.6 + typingPulseRef.current * 1.8;

      // Advance star particles along Z-axis for Warp-Speed tunnel effect
      const posAttr = starGeometry.getAttribute('position') as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        arr[i3 + 2] += speed * dt * 4.2;
        if (arr[i3 + 2] > 15) {
          arr[i3 + 2] = -38;
        }
      }
      posAttr.needsUpdate = true;

      // Subtle FOV & scale response during Warp Speed / Typing
      const targetFov = 60 + Math.min(warpVelocityRef.current * 1.1, 14);
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 6, dt);
        camera.updateProjectionMatrix();
      }

      starMaterial.size = 0.15 + Math.min(warpVelocityRef.current * 0.012 + typingPulseRef.current * 0.04, 0.18);
      gridMat.color.lerp(targetAccentColorRef.current, 0.08);
      outerRingMat.color.lerp(targetAccentColorRef.current, 0.08);
      innerRingMat.color.lerp(targetSecondaryColorRef.current, 0.08);
      gridMat.opacity = 0.1 + Math.min(typingPulseRef.current * 0.06 + warpVelocityRef.current * 0.012, 0.18);

      // Rotate composite 3D Neural Core
      const rotBoost = 1 + warpVelocityRef.current * 0.35 + typingPulseRef.current * 0.8;
      outerRing.rotation.z += dt * 0.22 * rotBoost;
      innerRing.rotation.y += dt * 0.35 * rotBoost;
      icoMesh.rotation.x += dt * 0.18 * rotBoost;
      icoMesh.rotation.y += dt * 0.26 * rotBoost;
      const coreScale = 1 + Math.sin(elapsed * 2.2) * 0.03 + typingPulseRef.current * 0.07;
      coreGroup.scale.setScalar(coreScale);

      // Smooth parallax camera tracking
      camera.position.x = THREE.MathUtils.damp(camera.position.x, pointerRef.current.x * 0.85, 4, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.6 + pointerRef.current.y * 0.45, 4, dt);
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      starGeometry.dispose();
      starMaterial.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      outerRingGeo.dispose();
      outerRingMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
    />
  );
};
