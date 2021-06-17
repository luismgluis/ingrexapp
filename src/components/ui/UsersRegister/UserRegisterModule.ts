import { useCallback, useState } from "react";
import api from "../../../libs/api/api";
import { ResidentType } from "../../../libs/types/ResidentType";
import utils from "../../../libs/utils/utils";
import {
  CAlertInfo,
  CAlertLoading,
  CAlertQuestion,
} from "../CAlert/CAlertNotification";
import { FeedImageType } from "../FeedImages/FeedImages";
import { InvokeQrScanner } from "../QRScanner/QRScannerModule";
const TAG = "USER REGISTER MOCULE";
function go() {
  const [checkResident, setCheckResident] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sector: "",
    idCard: "",
    qr: "AFF5562",
    phone: "",
    profileImage: "",
    isVisitor: true,
  });

  const cleanForm = useCallback(() => {
    const newForm = utils.objects.cloneObject(form);
    for (const key in newForm) {
      if (key === "isVisitor") {
        newForm[key] = true;
        continue;
      }
      newForm[key] = "";
    }
    setForm(newForm);
  }, [form]);

  const formChange = useCallback(
    (property, isNum = false) => {
      return (newValue: any) => {
        if (isNum) {
          if (isNaN(newValue)) return;
        }
        const newobj: any = {};
        newobj[property] = newValue;
        setForm({
          ...form,
          ...newobj,
        });
      };
    },
    [form],
  );

  const onSend = useCallback(() => {
    const optionals = ["qr", "sector"];
    const nForm: any = form;
    for (const key in nForm) {
      const element = nForm[key];
      if (element === "" && !optionals.includes(key)) {
        console.log(TAG, "element", key, "is empty");
        CAlertInfo("Complete Form", `The field ${key} is necesary`);
        return;
      }
    }
    if (nForm.sector === "" && checkResident) {
      CAlertInfo(
        "The field sector is empty",
        "Is needed sector value into the resident info.",
      );
      return;
    }
    const newResi = new ResidentType("", {
      name: nForm.name,
      sector: nForm.sector,
      idCard: nForm.idCard,
      qr: nForm.qr,
      telegram: "",
      phone: nForm.phone,
      profileImage: nForm.profileImage,
      isVisitor: !checkResident,
    });
    const alertLoading = CAlertLoading("Creating new user...");
    api.residents
      .saveResident(newResi)
      .then(() => {
        alertLoading.close();
        cleanForm();
        const alert = CAlertQuestion(
          "Registered user",
          "Can now be searched in the access screen",
          undefined,
          {
            text: "Ok",
            onPress: () => alert.close(),
          },
        );
      })
      .catch((err) => {
        console.log(TAG, "fail", err);
        const alert = CAlertQuestion(
          "Failed registration",
          "try again later",
          undefined,
          {
            text: "Ok",
            onPress: () => alert.close(),
          },
        );
      });
  }, [form, cleanForm, checkResident]);

  const onImageSelect = (data: FeedImageType) => {
    if (!data.imageFromCamera) {
      CAlertInfo(
        "Imagen Rechazada",
        "Aqui solo puedes ingresar fotografias tomadas en el momento",
      );
      return;
    }
    setForm({
      ...form,
      profileImage: data.uri,
    });
  };

  const onQrSelect = useCallback(
    (qrScanned: string) => {
      if (!(qrScanned.length > 0)) {
        return;
      }
      setForm({
        ...form,
        qr: qrScanned,
      });
    },
    [form],
  );

  const goQrCamera = InvokeQrScanner((text) => {
    onQrSelect(text);
  });

  return {
    form,
    goQrCamera,
    onQrSelect,
    onImageSelect,
    onSend,
    formChange,
    cleanForm,
    checkResident,
    setCheckResident,
  };
}

export const UserRegisterModule = go;
