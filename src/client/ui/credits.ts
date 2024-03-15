import { ready } from "../util/ready";

ready(() => {
  const scroll = document.getElementById(
    "btn-scroll-credits"
  ) as HTMLButtonElement;
  scroll.addEventListener("click", () => {
    console.log("scrolling");
    //scroll down all the way to the bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
});
