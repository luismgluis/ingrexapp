import Sound from "react-native-sound";
import api from "../api/api";
export default class playerSounds {
  path: string;
  sound: Sound;
  playing: boolean;
  onPlay: () => void;
  onStop: () => void;
  constructor(path?: string) {
    this.path = path || "";
    this.playing = false;
    /* */
  }
  setPath(path: string): void {
    this.path = path;
  }
  play(): void {
    /* */
    const that = this;
    const boom = new Sound(that.path, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        that.playing = false;
        console.error("failed to load the sound", error);
        return;
      }
      // loaded successfully
      console.warn(
        "duration in seconds: " +
          boom.getDuration() +
          "number of channels: " +
          boom.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      api.currentPlayerSouds.stop();
      api.currentPlayerSouds = that;
      boom.play((success) => {
        that.playing = false;
        that.onStop();
        if (!success) {
          console.error("playback failed due to audio decoding errors");
        }
      });
      that.onPlay();
    });
    that.sound = boom;
    that.playing = true;
  }
  stop(): void {
    /* */
    const that = this;
    that.playing = false;

    try {
      that.sound?.stop();
    } catch (error) {}
    try {
      that.onStop();
    } catch (error) {}
  }
}
