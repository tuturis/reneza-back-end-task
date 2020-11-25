import fs, { ReadStream } from "fs";
import path from "path";
import { promisify } from "util";
import { pipeline as streamPipeline } from "stream";

const mkdir = promisify(fs.mkdir);
const pipeline = promisify(streamPipeline);

class FakeStorage {
  constructor(private folder: string) {}

  async init() {
    if (!fs.existsSync(this.folder)) {
      await mkdir(this.folder, { recursive: false });
    }
  }

  saveStream(stream: ReadStream, filename: string) {
    const ws = fs.createWriteStream(`${this.folder}/${filename}`);
    return pipeline(stream, ws);
  }

  readFile(filename: string): ReadStream {
    const rs = fs.createReadStream(`${this.folder}/${filename}`);
    return rs;
  }
}

export const fakeStorage = new FakeStorage(
  path.resolve(__dirname, "../../storage")
);
