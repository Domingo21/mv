const visualization = [
    {
        id: "vis1",
        render: show1,
    },
    {
        id: "vis2",
        render: show2,
    },
    {
        id: "vis3",
        render: show3,
    },
    {
        id: "vis4",
        render: show4,
    },
];


let activevis = visualization[0];

function showvis(index) {
    document.getElementById("d3").innerHTML = "";//绘图区置空
    const previousItem = document.getElementById(activevis.id);//开始默认是第一个界面activeVisualization.id为0，后来点击后，这里为上一个点击的导航栏
    previousItem.classList.remove("bg-indigo-100", "text-stone-700");
    previousItem.classList.add("text-stone-400");//将上一个点击的导航栏恢复默认
  
    if (index < visualization.length) {
        activevis = visualization[index];
    }
  
    const currentItem = document.getElementById(activevis.id);
    currentItem.classList.remove("text-stone-400");
    currentItem.classList.add("bg-indigo-100", "text-stone-700");//将这次点击的导航栏突出
  
    activevis.render();//调用
  }
  
  document.addEventListener("dataset-ready", function (e) {
    activevis.render();
  });
  