import { ready } from "../../util/ready";
import { imInstance } from "../ImageManager";

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

    const originalWidth = imInstance.sourceImage.getWidth();

    imInstance.setSeamsToRemove(
      Math.floor(originalWidth * (1 - percent / 100))
    );
  });

  nextBtn.addEventListener("click", () => {
    imInstance.carve();
  });
});
