import { TrackerModel as Trackers } from "./model";
import { FileUpload } from "graphql-upload";
import { fakeStorage } from "../../services/storage";
import { TrackerResolverParent } from "./resolvers";

interface ICreateTrackerArgs {
  file: FileUpload;
}
export const createTracker = async (
  parent: unknown,
  { file }: ICreateTrackerArgs
): Promise<TrackerResolverParent> => {
  try {
    const { createReadStream, filename } = await file;

    await fakeStorage.saveStream(createReadStream(), filename);

    const tracker = await Trackers.create({
      filename,
      inquiries: [],
    });

    await tracker.save();

    return { ...tracker, id: tracker._id };
  } catch (error) {
    throw Error("Something went wrong.");
  }
};
