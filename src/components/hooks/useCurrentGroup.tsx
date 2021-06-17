import React, { useState } from "react";
import { useSelector } from "react-redux";
import GroupType from "../../libs/types/GroupType";
import utils from "../../libs/utils/utils";

const TAG = "useCurrentUser";
export function useCurrentGroup(): GroupType {
  const [group, setGroup] = useState<GroupType>(new GroupType("", null));

  useSelector((store: any) => {
    try {
      const newGroup = store.currentSession.group;
      if (!utils.objects.isEmpty(newGroup)) {
        if (group.id !== newGroup.id) {
          setGroup(new GroupType(newGroup.id, newGroup));
        }
        return new GroupType(newGroup.id, newGroup);
      }
    } catch (error) {
      console.log(TAG, error);
    }
    return new GroupType("", null);
  });

  return group;
}
