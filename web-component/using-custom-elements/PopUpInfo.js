/**
 * custom element
 *  ほぼHTMLElementを継承して作成する
 */
class PopUpInfo extends HTMLElement {
  constructor() {
    super(); // お約束

    // ここから定義していく
    // 1. shadow rootを作成
    // mode: open ... 外部のJSからアクセスできる element.shadowRoot => オブジェクトを返す
    // mode: close ... 外部のJSからアクセスできない element.shadowRoot => nullを返す
    const shadow = this.attachShadow({ mode: "open" });

    // 子要素を作成
    const container = document.createElement("div");
    container.setAttribute("class", "container");

    // プロパティから値を取得することも可能
    const text = this.getAttribute("comment");
    container.textContent = text;

    // shadowRootに追加していく
    shadow.appendChild(container);
  }
}
// custom elementを定義する
customElements.define("popup-info", PopUpInfo);
