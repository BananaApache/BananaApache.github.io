window.interestScalingBool = false;

function removeTooltips() {
  // Remove all title tags beneath svg tags to remove tooltips
  let keys = Array.from(document.querySelectorAll("g.node title")).map(
    (x) => x.innerHTML
  );
  let titles = Array.from(document.querySelectorAll("svg title"));

  // We might have to try again if the graph isn't loaded yet
  if (keys.length < Object.keys(window.proof).length) {
    setTimeout(removeTooltips, 500);
    return;
  }

  console.log(
    `Removing ${titles.length} titles (${keys.length} nodes + edges)`
  );

  titles.forEach(function (x) {
    x.remove();
  });

  // Since titles have been removed and SVG texts
  // no longer link back to the global proof object,
  // we need to somehow have that data available on hover.
  let nodes = Array.from(document.querySelectorAll("g.node text"));
  nodes.forEach(function (x, i) {
    x.setAttribute("proofKey", keys[i]);
  });
}

// if (window.interpretation){
// 	document.querySelector("#interestingnessOptions").hidden = true;
// }

function show_original_graph() {
  setTimeout(function () {
    window.proofText = document.getElementById("proofText").innerText;
    window.originalProof = parseProof(proofText);
    window.proof = JSON.parse(JSON.stringify(originalProof));

    assignInterestingnessToHeightAndWidth();
    showGV(proofToGV(proof));
    // if (window.interpretation) {
    // 	removeTooltips();
    // }

    // Weird Hacks for initializing gui
    document.querySelector("#settings").children[0].click();
    setTimeout(
      () =>
        document.querySelector("#nodeInfoContainer > .settingsHeader").click(),
      500
    );
  }, 200);
}

if (window.addEventListener)
  // W3C standard
  window.addEventListener("load", show_original_graph, false);
else if (window.attachEvent)
  // Microsoft
  window.attachEvent("onload", show_original_graph);
