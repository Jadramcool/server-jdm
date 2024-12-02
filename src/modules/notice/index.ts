import { ContainerModule, interfaces } from "inversify";
import { Notice } from "./notice/controller";
import { NoticeService } from "./notice/services";

const noticeContainer = new ContainerModule(
  (
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind
  ) => {
    /*
     * 公告
     */
    bind<Notice>(Notice).toSelf();
    bind<NoticeService>(NoticeService).toSelf();
  }
);

export { noticeContainer };