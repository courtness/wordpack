import WordpressTemplate from "./modules/WordpressTemplate";

export default class Home extends WordpressTemplate {
  constructor() {
    super();

    console.log(this.state);

    this.doSomethingWordpress();
    this.doSomethingResizable();
  }
}

var home = new Home();
