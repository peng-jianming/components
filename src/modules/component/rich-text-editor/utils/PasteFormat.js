export class PasteFormat {
  constructor(quill, config) {
    this.quill = quill;
    this.config = Object.assign(
      {
        onInsertImage: () => {},
        onInsertRichText: () => {},
        onInsertText: () => {},
        onInsertLink: () => {}
      },
      config
    );

    quill.root.addEventListener('paste', this.pasteHandler.bind(this), false);
  }

  /**
   * 右键黏贴内容
   */
  pasteHandler() {
    const matchers = this.quill && this.quill.clipboard.matchers;
    const pasteMatcher = [Node.ELEMENT_NODE, this.nodeHandler.bind(this)];
    matchers.push(pasteMatcher);
  }

  /**
   * 针对黏贴内容进行处理
   * 可以控制内容格式、或禁止内容输入
   * https://quilljs.com/docs/modules/clipboard/
   */
  nodeHandler(node, delta) {
    // eslint-disable-next-line no-param-reassign
    delta.ops = delta.ops
      .map(op => {
        if (typeof op.insert === 'string') {
          if (op.attributes && op.attributes.link) {
            return this.config.onInsertLink(op);
          }
          return this.config.onInsertText(op);
        }
        if (op.insert && op.insert.image) {
          return this.config.onInsertImage(op);
        }
        return this.config.onInsertRichText(op);
      })
      .filter(op => typeof op === 'object');
    return delta;
  }
}
