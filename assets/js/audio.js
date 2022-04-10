export function songEffect(song) {
  const songEffectCash = new Audio("/assets/audio/Money.wav");
  const songEffectTrash = new Audio("/assets/audio/Trash.wav");
  const songEffectFinish = new Audio("/assets/audio/Finish.wav");
  
  switch (song) {
    case "trash":
      songEffectTrash.currentTime = 0.8;
      songEffectTrash.play();
      break;
    case "cash":
      songEffectCash.currentTime = 0.6;
      songEffectCash.play();
      break;
    case "finish":
      songEffectFinish.play();
      break;
  }
}
