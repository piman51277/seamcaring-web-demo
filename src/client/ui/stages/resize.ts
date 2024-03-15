import { ready } from "../../util/ready";
import { Stage, setStage } from "../setStage";

const BOX_WIDTH = 860;

ready(() => {
  const nextBtn = document.getElementById("resize-next") as HTMLElement;
  const slider = document.getElementById(
    "carving-percent-slider"
  ) as HTMLInputElement;
  const selectDiv = document.getElementById("choose-region") as HTMLDivElement;
  const hideDiv = document.getElementById("hide-region") as HTMLDivElement;

  //set initial values
  slider.value = "90";
  selectDiv.style.width = "774 px";
  hideDiv.style.width = "86 px";

  slider.addEventListener("input", () => {
    const percent = parseInt(slider.value);
    const selectWidth = (BOX_WIDTH * percent) / 100;
    const hideWidth = BOX_WIDTH - selectWidth;

    selectDiv.style.width = selectWidth + "px";
    hideDiv.style.width = hideWidth + "px";
  });

  nextBtn.addEventListener("click", () => {
    //fire off the processing, which should handle the next few transitions.
    //FIME: debug goes directly to download
    setStage(Stage.REVIEW);
  });
});
