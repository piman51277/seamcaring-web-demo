import { setStage, Stage } from "./ui/setStage";
import { ready } from "./util/ready";

//stages
import "./ui/stages/upload";
import "./ui/stages/uploadReject";
import "./ui/stages/preview";
import "./ui/stages/masking";
import "./ui/stages/resize";
import "./ui/stages/review";

//scrolling
import "./ui/credits";

ready(() => {
  setStage(Stage.UPLOAD_AWAIT);
});
