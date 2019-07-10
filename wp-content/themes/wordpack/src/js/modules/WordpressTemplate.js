import { documentService } from "~/src/js/services/DocumentService";

export default class WordpressTemplate {
  constructor() {
    this.initialize();
  }

  initialize = () => {
    documentService.addDocumentScrollListener();
    documentService.addWindowResizeListener();
  }
}
