declare var FamilyTree: any;

function loadFamilyTree(data: any[]) {
  const container = document.getElementById("treeContainer");
  if (container && typeof FamilyTree !== "undefined") {
    new FamilyTree(container, {
      nodes: data,
      nodeBinding: {
        field_0: "name",
        img_0: "img"
      }
    });
  }
}
