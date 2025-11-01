import { AzExtParentTreeItem } from "@microsoft/vscode-azext-utils";
import { ToolTipTreeItem } from "../ToolTipTreeItem";
import { PodmanPodInfo } from "./PodsTreeItem";


export class PodTreeItem extends ToolTipTreeItem {
    public static contextValue: string = 'pod';
    public contextValue: string = PodTreeItem.contextValue;
    private readonly _item: PodmanPodInfo;

    public constructor(parent: AzExtParentTreeItem, itemInfo: PodmanPodInfo) {
        super(parent);
        this._item = itemInfo;

    }

    public get id(): string {
        return getPodId(this._item);
    }
}
