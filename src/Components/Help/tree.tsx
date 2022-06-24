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
                <TreeItem label={'Создание плейлистов'}/>
                <TreeItem label={'Добавление в библиотеку'}/>
                <TreeItem label={'Взаимодействие с треками'} expandable expandedDefault>
                    <Tree>
                        <TreeItem label={'Добавление треков'}/>
                        <TreeItem label={'Удаление треков'}/>
                    </Tree>
                </TreeItem>
                <TreeItem label={'Удаление плейлистов'}/>
            </Tree>
        </TreeItem>
        <TreeItem label={'Треки'} expandable>
            <Tree>
                <TreeItem label={'Загрузка треков'}/>
            </Tree>
        </TreeItem>
    </Tree>
}

export default HelpTree