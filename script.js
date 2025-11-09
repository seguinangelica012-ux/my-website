const scenes = document.querySelectorAll(".scene");
let index = 1; // Start from Scene 2

const sceneDurations = {
  "scene2": 14000,
  "scene3": 12000,
  "scene4-1": 15000,
  "scene4-2": 15000,
  "scene4-3": 12000,
  "scene4-4": 12000,
  "scene4-5": 12000,
  "scene4-6": 10000,
  "scene6": 12000,
  "scene7": 14000,
  "scene8": 14000,
  "scene9": 15000
};

let autoPlayTimeout;

function startStory() {
  showSceneWithDelay(index);
}

function showSceneWithDelay(sceneIndex){
  if(sceneIndex >= scenes.length) return;

  scenes.forEach(s=>s.classList.remove("active"));
  const scene = scenes[sceneIndex];
  scene.classList.add("active");

  const img = scene.querySelector(".photo");
  if(img){
    img.style.opacity=0;
    setTimeout(()=>{img.style.opacity=1;},500);
  }

  let duration = sceneDurations[scene.id] || 10000;

  // Only auto-play if scene is NOT 4-6 (Click to Continue)
  if(scene.id !== "scene4-6"){
    autoPlayTimeout = setTimeout(()=> showSceneWithDelay(sceneIndex+1), duration);
    index = sceneIndex + 1;
  } else {
    index = sceneIndex + 1; // prepare index for next slide after button
  }
}

function clickToContinue(){
  clearTimeout(autoPlayTimeout);
  showSceneWithDelay(index); // go to next scene
}

function replay(){
  index = 1;
  showSceneWithDelay(index);
}
