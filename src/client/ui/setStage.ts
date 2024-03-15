export enum Stage {
  UPLOAD_AWAIT,
  UPLOAD_REJECT,
  PREVIEW,
  MASKING,
  RESIZE,
  PROCESSING,
  REVIEW,
}

let currentStage = Stage.UPLOAD_AWAIT;

const stageElements = {
  [Stage.UPLOAD_AWAIT]: "stage-upload",
  [Stage.UPLOAD_REJECT]: "stage-upload-reject",
  [Stage.PREVIEW]: "stage-preview",
  [Stage.MASKING]: "stage-masking",
  [Stage.RESIZE]: "stage-resize",
  [Stage.PROCESSING]: "stage-processing",
  [Stage.REVIEW]: "stage-review",
};

/**
 * Set the stage of the UI to the given stage
 *
 * @param stage of enum Stage
 */
export function setStage(stage: Stage): void {
  setProgressBar(stage);

  // get the classlist for the current stage
  const currentStageElement = document.getElementById(
    stageElements[currentStage]
  ) as HTMLElement;
  currentStageElement.classList.add("norender");

  // get the classlist for the new stage
  const newStageElement = document.getElementById(
    stageElements[stage]
  ) as HTMLElement;
  newStageElement.classList.remove("norender");

  currentStage = stage;
}

const barElements = [
  "progBar1",
  "progBar2",
  "progBar3",
  "progBar4",
  "progBar5",
  "progBar6",
];

const COLOR_ACTIVE = "#595FD9";
const COLOR_INACTIVE = "#DBDAE7";

const stageProgress = {
  [Stage.UPLOAD_AWAIT]: 0,
  [Stage.UPLOAD_REJECT]: 0,
  [Stage.PREVIEW]: 1,
  [Stage.MASKING]: 2,
  [Stage.RESIZE]: 3,
  [Stage.PROCESSING]: 4,
  [Stage.REVIEW]: 5,
};

/**
 * Control the progress bar for the given stage
 *
 * @param stage of enum Stage
 */
function setProgressBar(stage: Stage) {
  const amount = stageProgress[stage];
  for (let i = 0; i < barElements.length; i++) {
    const bar = document.getElementById(barElements[i]) as HTMLElement;
    const color = i <= amount ? COLOR_ACTIVE : COLOR_INACTIVE;

    //get all children of the progress bar
    const children = bar.children;
    for (let j = 0; j < children.length; j++) {
      const child = children[j] as HTMLElement;

      //set the fill color of the progress bar
      child.setAttribute("fill", color);
    }
  }
}
