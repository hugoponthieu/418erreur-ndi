import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, ShaderPass, RenderPass } from "three-stdlib";

import PixelateShader from "./PixelateShader.ts";
import { VignetteShader } from "./VignetteShader.ts";
import ColorCorrectionShader from "./ColorCorrection.ts";
import * as THREE from "three";

export function Effects() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    const renderTarget = new THREE.WebGLRenderTarget(size.width, size.height);
    const pixelatePass = new ShaderPass(PixelateShader);
    const colorPass = new ShaderPass(ColorCorrectionShader);
    const vignette = new ShaderPass(VignetteShader);
    // colorPass.uniforms["addRGB"].value = new THREE.Vector3(0.2, 0, 0.4);
    pixelatePass.uniforms["resolution"].value = new THREE.Vector2(
      size.width,
      size.height,
    );
    pixelatePass.uniforms["pixelSize"].value = 5.0;

    vignette.uniforms["darkness"].value = 1.2;

    composer.current = new EffectComposer(gl, renderTarget);
    composer.current.addPass(new RenderPass(scene, camera));
    composer.current.addPass(pixelatePass);
    // composer.current.addPass(colorPass);
    composer.current.addPass(vignette);

    return () => {
      renderTarget.dispose();
      composer.current.dispose();
    };
  }, [gl, scene, camera, size]);

  useFrame((_, delta) => {
    if (composer.current) {
      composer.current.render(delta);
    }
  }, 1);

  return null;
}
