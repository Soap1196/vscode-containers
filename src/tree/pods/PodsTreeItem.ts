/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzExtParentTreeItem } from "@microsoft/vscode-azext-utils";
import { ListPodsItem } from "@microsoft/vscode-container-client";
import { l10n } from "vscode";
import { LocalChildType, LocalRootTreeItemBase } from "../LocalRootTreeItemBase";
import { CommonGroupBy, groupByNoneProperty } from "../settings/CommonProperties";
import { ITreeArraySettingInfo, ITreeSettingInfo } from "../settings/ITreeSettingInfo";
import { TreePrefix } from "../TreePrefix";
import { podProperties, PodProperty } from "./PodProperties";

export type PodmanPodInfo = ListPodsItem & {
    showFiles: boolean
}

export class PodsTreeItem extends LocalRootTreeItemBase<PodmanPodInfo, PodProperty> {

    public constructor(parent?: AzExtParentTreeItem) {
        super(parent);
        this.sortBySettingInfo.properties.push({
            property: 'Size',
            description: l10n.t('Sort by pod size')
        });
    }

    public treePrefix: TreePrefix = 'pods';
    public label: string = l10n.t('Pods');
    public configureExplorerTitle: string = l10n.t('Configure pod explorer');

    public childType: LocalChildType<PodmanPodInfo> = ImageTreeItem;

    public descriptionSettingInfo: ITreeArraySettingInfo<PodProperty> = {
        properties: podProperties,
        defaultProperty: ['CreatedTime'],
    };

    public groupBySettingInfo: ITreeSettingInfo<PodProperty | CommonGroupBy> = {
        properties: [...podProperties.filter(p => p.property !== 'Size'), groupByNoneProperty],
        defaultProperty: 'PodName',
    };

    public labelSettingInfo: ITreeSettingInfo<PodProperty> = {
        properties: podProperties,
        defaultProperty: 'PodId',
    };



}
