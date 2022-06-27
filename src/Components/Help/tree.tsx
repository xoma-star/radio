import {Tree, TreeItem} from "../Common/Tree";
import React from "react";

interface props{
    onClick?: (path: string) => void
}

const HelpTree = ({onClick}: props) => {
    return <Tree topLevel>
        <TreeItem label={'Аккаунт'} expandable>
            <Tree>
                <TreeItem label={'Регистрация'} onClick={() => onClick && onClick('signup')}/>
                <TreeItem label={'Вход'} onClick={() => onClick && onClick('login')}/>
                <TreeItem label={'Восстановление доступа'} onClick={() => onClick && onClick('restore')}/>
            </Tree>
        </TreeItem>
        <TreeItem label={'Плеер'} expandable>
            <Tree>
                <TreeItem label={'Управление'} onClick={() => onClick && onClick('player')}/>
                <TreeItem label={'Очередь'} onClick={() => onClick && onClick('queue')}/>
            </Tree>
        </TreeItem>
        <TreeItem label={'Плейлисты'} expandable>
            <Tree>
                <TreeItem label={'Создание плейлистов'} onClick={() => onClick && onClick('playlist:create')}/>
                <TreeItem label={'Редактирование плейлиста'} onClick={() => onClick && onClick('playlist:edit')}/>
                <TreeItem label={'Добавление в библиотеку'} onClick={() => onClick && onClick('playlist:save')}/>
                <TreeItem label={'Взаимодействие с треками'} expandable expandedDefault>
                    <Tree>
                        <TreeItem label={'Добавление треков'} onClick={() => onClick && onClick('playlist:addTrack')}/>
                        <TreeItem label={'Удаление треков'} onClick={() => onClick && onClick('playlist:removeTrack')}/>
                    </Tree>
                </TreeItem>
                <TreeItem label={'Удаление плейлистов'} onClick={() => onClick && onClick('playlist:remove')}/>
            </Tree>
        </TreeItem>
        <TreeItem label={'Треки'} expandable>
            <Tree>
                <TreeItem label={'Загрузка треков'} onClick={() => onClick && onClick('track:upload')}/>
            </Tree>
        </TreeItem>
        <TreeItem label={'Управление на мобильных устройствах'} onClick={() => onClick && onClick('mobile')}>

        </TreeItem>
    </Tree>
}

export default HelpTree