import { documentService } from "~/src/js/services/DocumentService";

export default class WordpressTemplate {
  constructor() {
    this.mount();
  }

  mount = () => {
    documentService.addDocumentScrollListener();
    documentService.addWindowResizeListener();
  }
}
