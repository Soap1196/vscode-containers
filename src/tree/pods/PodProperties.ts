/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ListPodsItem } from "@microsoft/vscode-container-client";
import { l10n, ThemeColor, ThemeIcon, workspace } from "vscode";
import { configPrefix } from "../../constants";
import { commonProperties, CommonProperty, getCommonPropertyValue } from "../settings/CommonProperties";
import { ITreePropertyInfo } from "../settings/ITreeSettingInfo";

export type PodProperty =
    | CommonProperty
    | 'Size'
    | 'PodId'
    | 'PodName'
    | 'Networks'
    | 'Ports'
    | 'State'
    | 'Status'
    | 'Label';

export const podProperties: ITreePropertyInfo<PodProperty>[] = [
    ...commonProperties,
    { property: 'PodId', exampleValue: 'fdeab20e859d' },
    { property: 'PodName', exampleValue: 'amazing_hoover' },
    { property: 'Networks', exampleValue: 'mybridge_network' },
    { property: 'Ports', exampleValue: '8080' },
    { property: 'State', exampleValue: 'exited' },
    { property: 'Status', exampleValue: 'Exited (0) 2 hours ago' },
    { property: 'Label', exampleValue: 'com.microsoft.created-by=visual-studio-code' },
];

export function getPodStateIcon(state: string): ThemeIcon {
    switch (state.toLowerCase()) {
        case 'created':
        case 'dead':
        case 'exited':
        case 'removing':
        case 'terminated':
        case 'unknown':
        case 'waiting':
            return new ThemeIcon('debug-stop', new ThemeColor('debugIcon.stopForeground'));
        case 'paused':
            return new ThemeIcon('debug-pause', new ThemeColor('debugIcon.pauseForeground'));
        case 'restarting':
            return new ThemeIcon('debug-restart', new ThemeColor('debugIcon.restartForeground'));
        case 'running':
        default:
            return new ThemeIcon('debug-start', new ThemeColor('debugIcon.startForeground'));
    }
}

export function getPodPropertyValue(item: ListPodsItem, property: PodProperty): string {
    const networks = item.networks?.length > 0 ? item.networks : ['<none>'];
    const ports = item.ports?.length > 0 ? item.ports.map(p => p.hostPort) : ['<none>'];

    switch (property) {
        case 'PodId':
            return item.id.slice(0, 12);
        case 'PodName':
            return item.name;
        case 'Networks':
            return networks.join(',');
        case 'Ports':
            return ports.join(',');
        case 'State':
            return item.state;
        case 'Status':
            return item.status?.replace(/(\d+ seconds?)|(Less than a second)/i, l10n.t('Less than a minute'));
        case 'Label':
            return getLabelGroup(item, workspace.getConfiguration(configPrefix)?.get<string | undefined>('containers.groupByLabel', undefined), NonLabelGroupName);
        default:
            return getCommonPropertyValue(item, property);
    }
}

export const NonComposeGroupName = l10n.t('Individual Pods');
export const NonLabelGroupName = l10n.t('Others');

export function getLabelGroup(Pod: ListPodsItem, label: string | undefined, defaultGroupName: string): string {
    if (!label) {
        return defaultGroupName;
    }

    const containerLabels = Pod?.labels;
    return containerLabels?.[label] || defaultGroupName;
}
