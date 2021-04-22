export default class RoomMessageType {
  id: string;
  creator: string;
  type: "text" | "image" | "video" | "stiker" | "audio";
  location?: string;
  text?: string;
  fileUrl?: string;
  videoUrl?: string;
  creationDate?: number;
  firstMessage?: boolean;
  lastMessage?: boolean;
  isVisibleMessage?: boolean;
  fileUpload?: boolean;
  fileSize?: number;
  fileTime?: number;
  fileDimensions?: string;
  updateView?: (module: string) => void;
  constructor(id: string, data) {
    this.id = id;
    this.text = data.text || "";
    this.creator = data.creator || "";
    this.type = data.type || "text";
    this.location = data.location || null;
    this.fileUrl = data.fileUrl || data.imageUrl || "";
    this.creationDate = data.creationDate || 0;
    this.firstMessage = data.firstMessage || false;
    this.lastMessage = data.lastMessage || false;
    this.isVisibleMessage = data.isVisibleMessage || false;
    this.fileUpload = data.fileUpload || data.imageUpload || true;
    this.fileSize = data.fileSize || 0;
    this.fileTime = data.fileTime || 0;
    this.fileDimensions = data.fileDimensions || "";
    const empty = () => {
      return null;
    };
    this.updateView = data.updateView || empty;

    if (this.type === "text") {
      this.text = data.text;
    }
  }
  setText(text: string): void {
    this.type = "text";
    this.text = text;
  }
  setMessageID(id: string): void {
    this.id = id;
  }
  setVideo(uri: string, duration: number): void {
    this.type = "video";
    this.fileUrl = uri;
    this.fileTime = duration;
  }
  setImage(uri: string, dimensions: string): void {
    this.type = "image";
    this.fileUrl = uri;
    this.fileDimensions = dimensions;
  }
  setAudio(path: string, size: number, time: number): void {
    this.type = "audio";
    this.fileUrl = path;
    this.fileSize = size;
    this.fileTime = time;
  }
  setFileUpload(val: boolean): void {
    this.fileUpload = val;
  }
  setLocation(lat: number, lng: number): void {
    this.location = `${lat},${lng}`;
  }
  setIsVisible(visible: boolean): void {
    this.isVisibleMessage = visible;
  }
  isEmpty(): boolean {
    if (this.creator === "" || this.id === "" || this.creationDate === 0) {
      return true;
    }
    return false;
  }
  exportToUpload(): any {
    if (this.type === "text") {
      return {
        creator: this.creator,
        text: this.text,
        type: this.type,
        creationDate: this.creationDate,
      };
    } else if (
      this.type === "image" ||
      this.type === "audio" ||
      this.type === "video"
    ) {
      return {
        creator: this.creator,
        fileUrl: this.fileUrl,
        type: this.type,
        creationDate: this.creationDate,
        fileTime: this.fileTime,
        fileSize: this.fileSize,
        fileDimensions: this.fileDimensions,
      };
    }
    return null;
  }
}
