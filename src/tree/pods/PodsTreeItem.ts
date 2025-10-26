/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ListPodsItem } from "@microsoft/vscode-container-client";
import { l10n } from "vscode";
import { LocalRootTreeItemBase } from "../LocalRootTreeItemBase";
import { ITreeSettingInfo } from "../settings/ITreeSettingInfo";
import { TreePrefix } from "../TreePrefix";
import { PodProperty } from "./PodProperties";

export type PodmanPodInfo = ListPodsItem & {
    showFiles: boolean
}

export class PodsTreeItem extends LocalRootTreeItemBase<PodmanPodInfo, PodProperty> {
    public treePrefix: TreePrefix = 'pods';
    public label: string = l10n.t('Pods');

    public labelSettingInfo: ITreeSettingInfo<PodProperty> = {
        properties: imageProperties,
        defaultProperty: 'Tag',
    };
}
