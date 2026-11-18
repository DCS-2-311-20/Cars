//
// 応用プログラミング 第8回 (ap0801.js)
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GLTFLoader } from "three/addons";

// サブレンダラを作る関数の定義
function makeSubRenderer(parts, size) {

}

// コースの制御点
const controlPoints = [
  [ // 第1パート
    [ 25, 40],
    [-50,-20]
  ],
  [ // 第2パート
    [ 50,-20],
    [-25, 40]
  ],
  [ // 第3パート
    [-25,-40],
    [ 50, 20]
  ],
  [ // 第4パート
    [-50, 20],
    [ 25,-40]
  ]
]

// ３Ｄページ作成関数の定義
function init() {
  // シーンの構成を4つの部分に分けて分担する
  const parts = [
    {id: "left1", origin: new THREE.Vector3(50, 0, -40)},
    {id: "left2", origin: new THREE.Vector3(-50, 0, -40)},
    {id: "left3", origin: new THREE.Vector3(-50, 0, 40)},
    {id: "left4", origin: new THREE.Vector3(50, 0, 40)}
  ];
  const nameHeight = document.getElementById("name").clientHeight;
  let width = window.innerWidth;
  let height = window.innerHeight-nameHeight;
  // シーン作成
  const scene = new THREE.Scene();

  // メインカメラの作成
  const mainCamera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
  {
    mainCamera.position.set(10,5,10);
    mainCamera.lookAt(0,0,0);
  }
  // サブカメラの作成

  // メインレンダラの作成
  const mainRenderer = new THREE.WebGLRenderer();
  {
    mainRenderer.setClearColor(0x204060);
    mainRenderer.setSize(width, height);
    mainRenderer.setPixelRatio(window.devicePixelRatio);
  }
  document.getElementById("main").appendChild(mainRenderer.domElement);

  // サブレンダラの作成


  let cars = [];
  // 3Dモデル(GLTF形式)の読み込み
  const PREFIX = "SHTV_Prefab_Car_"; // 4つの車の接頭辞
  const modelLoader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load("cityTexture.png", texture => {
    modelLoader.load("cars/scene.gltf", model => {
      console.log(model);
      // 車の分割

      // シーンに車を追加
      scene.add(model.scene);
      // コースの描画
      parts.forEach((part, i) => {

      })

      // 平面
      const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(200, 160),
          new THREE.MeshLambertMaterial({color: "green"})
      )
      plane.rotateX(-Math.PI/2);
      scene.add(plane);
      render();
    });
  });

  // 光源の設定
  { // 環境ライト
    const light = new THREE.AmbientLight();
    light.intensity=1.5;
    scene.add(light);
  }
  { // ポイントライト
    const light = new THREE.PointLight(0xffffff, 5000);
    light.position.set(0, 50, 0);
    scene.add(light);
  }
  
  // Windowサイズの変更処理
  window.addEventListener("resize", ()=>{
    width = window.innerWidth;
    height = window.innerHeight - nameHeight;
    mainCamera.aspect = width/height;
    mainCamera.updateProjectionMatrix();
    mainRenderer.setSize(width, height);
  }, false);

  // 各セクションをクリックしたときにメイン表示のカメラを切り替える
  let camera = mainCamera;

  // 描画処理
  function render() {
    mainRenderer.render(scene, camera);
    requestAnimationFrame(render);
  }
}

document.onload = init();