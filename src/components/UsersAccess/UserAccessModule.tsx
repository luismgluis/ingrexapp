import { Text } from "@ui-kitten/components";
import React from "react";
import { ResidentType } from "../../libs/types/ResidentType";
import {
  CAlertEmpty,
  CAlertInfo,
  CAlertLoading,
  CAlertType,
} from "../CAlert/CAlertNotification";
import Panel from "../Panel/Panel";
import api from "./../../libs/api/api";
import UserAccessRequest from "./UserAccessRequest";
import UserAccessSearch from "./UserAccessSearch";
export class UserAccessModule {
  constructor() {
    //
  }
  getUsersByIdCard(value: string): Promise<ResidentType> {
    return new Promise<ResidentType>((resolve, reject) => {
      try {
        api.residents
          .searchResident("idCard", value)
          .then((data) => {
            if (data.length > 0) {
              resolve(data[0]);
              return;
            }
            reject(null);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  getUsersBySector(value: string): Promise<Array<ResidentType>> {
    return new Promise<Array<ResidentType>>((resolve, reject) => {
      try {
        api.residents
          .searchResident("sector", value)
          .then((data) => {
            if (data.length > 0) {
              resolve(data);
              return;
            }
            reject(null);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  saveExit(resident: ResidentType): CAlertType {
    if (resident.isEmpty()) return;
    const alertLoading = CAlertLoading("Registering output...");
    const resiExit = new ResidentType("", {});
    api.residents
      .getLastAccess(resident)
      .then((access) => {
        if (access.length > 0) {
          const lastAccess = access[0];
          resiExit.sector = lastAccess.sector;
          api.residents
            .saveAccess(resident, resiExit, false)
            .then(() => {
              alertLoading.close();
            })
            .catch(() => alertLoading.close());
        }
      })
      .catch(() => {
        api.residents
          .saveAccess(resident, resiExit, false)
          .then(() => alertLoading.close())
          .catch(() => alertLoading.close());
      });
    return alertLoading;
  }
  getResidentConfirmation(
    visitor: ResidentType,
    onConfirm: (res: boolean) => void,
  ): CAlertType {
    if (visitor.isEmpty()) return;

    let currentResidentSelect = new ResidentType("", {});
    const accessEnabled = (msj = "") => {
      const alert = CAlertInfo(
        "Access enabled",
        msj === ""
          ? `The resident has accepted ${visitor.name}'s admission to sector ${currentResidentSelect.sector}.`
          : msj,
      );
      if (!currentResidentSelect.isEmpty()) {
        api.residents.saveAccess(visitor, currentResidentSelect, false);
      }
      onConfirm(true);
      return alert;
    };
    const accessDenied = () => {
      const alert = CAlertInfo(
        "¡Access denied!",
        `The resident has rejected ${visitor.name}'s admission to sector ${currentResidentSelect.sector}.`,
      );
      onConfirm(true);
      return alert;
    };
    if (!visitor.isVisitor) {
      return accessEnabled("This user is a resident.");
    }

    const action = (resident) => {
      currentResidentSelect = resident;
      CAlertEmpty(
        <UserAccessRequest
          visitor={visitor}
          resident={resident}
          onConfirm={(res) => {
            if (res) accessEnabled();
            if (!res) accessDenied();
          }}
        />,
        () => onConfirm(false),
        true,
      );
    };

    const alert = CAlertEmpty(
      <Panel paddingVertical={50} totalHeight="80%">
        <Panel totalHeight="100px" horizontalCenter={true}>
          <Text category="h4">What is the destiny</Text>
        </Panel>
        <Panel totalHeight="100px">
          <UserAccessSearch
            inputType="sector"
            onResult={(res) => action(res)}
          />
        </Panel>
      </Panel>,
      () => onConfirm(false),
      true,
    );

    return alert;
  }
}
