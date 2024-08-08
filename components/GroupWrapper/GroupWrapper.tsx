import { GroupType } from "../../types/group";
import React from "react";
import GroupCard from "../GroupCards/GroupCards";
import styles from "./GroupWrapper.module.css";

type GroupCardWrapper = {
    groups: GroupType[];
};

const GroupCardsWrapper = ({ groups }: GroupCardWrapper) => {
    return(
        <div className={styles.GroupCard_padding}>
            {groups.map((group) => (
                <GroupCard
                id={group.id}
                key={group.id}
                name={group.name}
                created_at={group.created_at}
                />
            ))}
        </div>
    )
}

export default GroupCardsWrapper;