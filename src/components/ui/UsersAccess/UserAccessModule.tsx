import { Text } from "@ui-kitten/components";
import React from "react";
import { ResidentType } from "../../../libs/types/ResidentType";
import utils from "../../../libs/utils/utils";
import {
  CAlertEmpty,
  CAlertInfo,
  CAlertLoading,
  CAlertType,
} from "../CAlert/CAlertNotification";
import Panel from "../Panel/Panel";
import api from "./../../../libs/api/api";
// eslint-disable-next-line object-curly-newline
import UserAccessRequest, {
  confirmationOptionsType,
  // eslint-disable-next-line object-curly-newline
} from "./UserAccessRequest";
import UserAccessSearch from "./UserAccessSearch/UserAccessSearch";

const TAG = "USER ACCESS MODULE";
export class UserAccessModule {
  constructor() {
    //
  }

  saveExit(resident: ResidentType): CAlertType | null {
    if (resident.isEmpty()) return null;
    const alertLoading = CAlertLoading("Registering output...");
    const resiExit = new ResidentType("", null);
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
  ): CAlertType | null {
    if (visitor.isEmpty()) return null;

    let currentResidentSelect = new ResidentType("", null);
    const accessEnabled = (msj = "") => {
      const alert = CAlertInfo(
        "Access enabled",
        msj === ""
          ? `The resident has accepted ${visitor.name}'s access to sector ${currentResidentSelect.sector}.`
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

    const action = (resident: any) => {
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
        false,
      );
    };

    const JsxCom: React.FC<any> = () => {
      return (
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
        </Panel>
      );
    };

    const alert = CAlertEmpty(<JsxCom />, () => onConfirm(false), true);

    return alert;
  }
  openTelegram(
    resident: ResidentType,
    visitor: ResidentType,
  ): Promise<confirmationOptionsType> {
    const msj = `Aviso de porteria \n${visitor.name} esta en la entrada. \n¿Le dejas acceder? \n\n\nImagen: ${visitor.profileImage}`;

    const replyButtons = ["✅ Aceptar acceso", "❌ Rechazar acceso"];

    const analiceReply = (reply: string) => {
      const res = utils.analiceAnswerYesNo(reply);

      let confirmationOptions: confirmationOptionsType = {
        enabled: false,
        answer: null,
        typeAlert: "telegram",
        message: "",
        listener: () => null,
      };
      switch (res) {
        case "YES":
          confirmationOptions = {
            ...confirmationOptions,
            enabled: true,
            message: "Acceso Concedido",
          };
          break;
        case "NO":
          confirmationOptions = {
            ...confirmationOptions,
            enabled: true,
            message: "Acceso Denegado",
          };
        // eslint-disable-next-line no-fallthrough
        default:
          confirmationOptions = {
            ...confirmationOptions,
            enabled: true,
            message: reply,
          };
          break;
      }
      confirmationOptions.answer = res;
      return confirmationOptions;
    };

    const sendMsj = (resolve: (data: any) => void, reject: any) => {
      const now = utils.dates.dateNowUnix();
      api.residents
        .sendTelegramMessage(resident, msj, replyButtons)
        .then((result) => {
          result.setCallBack((reply) => {
            if (reply == null) {
              return;
            }
            if (reply.reply === "") {
              return;
            }
            const restDates = parseInt(reply.creationDate) - now;
            if (restDates > 60 * 20) {
              return;
            }
            const res = analiceReply(reply.reply);
            resolve(res);
            result.stopListener();
          });
        })
        .catch((err) => {
          console.log(TAG, err);
          reject(null);
        });
    };

    return new Promise<confirmationOptionsType>((resolve, reject) => {
      try {
        sendMsj(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
}
