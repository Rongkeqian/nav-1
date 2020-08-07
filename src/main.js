const $siteList = $(".siteList"); //找到要添加的容器
const $lastLi = $siteList.find(`li.buttonArea`); //插入位置的后一个
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com/",
  },
];
const simplifyUrl = (url) => {
  //去掉显示网址的https:// http:// www
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};
const render = () => {
  $siteList.find("li:not(.buttonArea)").remove();
  hashMap.forEach((node, index) => {
    //当前元素和下标
    //console.log(index);
    const $li = $(`<li>
                  <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class='close'>
                        <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                  </div>
          </li>`).insertBefore($lastLi);
    $li.on("click", (e) => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止冒泡
      //console.log(hashMap);打印出当前的hashMap里的记录
      hashMap.splice(index, 1);
      render(); //删除后重新渲染
    });
  });
};

render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  //   console.log(typeof hashMap);
  //   console.log(typeof string);
  //   console.log(string);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  //console.log(e.key);

  //const key = e.key;//两行一样的
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLocaleLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
