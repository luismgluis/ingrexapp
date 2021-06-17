import { StyleSheet } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { Icon, Text, Toggle } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";

import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import PerfilAvatar from "../Perfil/PerfilAvatar/PerfilAvatar";
import { UserRegisterModule } from "./UserRegisterModule";
import { useTheme } from "../../hooks/useTheme";
import CameraIcon from "../../Icons/others/CameraICon";
const styles = StyleSheet.create({
  container: {},
  panel: { width: "80%" },
  panelTitle: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

const TAG = "USERS REGISTER";
type UsersRegisterProps = {
  pagerFocus?: boolean;
};
const UsersRegister: React.FC<UsersRegisterProps> = ({ pagerFocus }) => {
  const theme = useTheme();
  const {
    form,
    goQrCamera,
    onQrSelect,
    onImageSelect,
    onSend,
    formChange,
    cleanForm,
    checkResident,
    setCheckResident,
  } = UserRegisterModule();

  return (
    <Panel horizontalCenter={true} style={styles.container}>
      <Panel style={styles.panelTitle} level="6">
        <Text category="h3">Register User</Text>
      </Panel>
      <Panel totalHeight={150} style={styles.panel}>
        <Panel withScroll={true} paddingVertical={30}>
          <>
            <Panel horizontalCenter={true}>
              <PerfilAvatar
                imageUri={form.profileImage}
                changeButtonEnabled={true}
                onSelect={(data) => onImageSelect(data)}
              />
            </Panel>
            <CInput
              paddingVertical={20}
              value={form.name}
              onChangeText={formChange("name")}
              label="Name (*)"
              placeholder="Jhonn Doo"
              accessoryLeft={(props) => (
                <Icon {...props} name={"person-outline"} />
              )}
            />
            <CInput
              paddingVertical={20}
              value={form.idCard}
              onChangeText={formChange("idCard", true)}
              keyboardType="numeric"
              label="ID Card (*)"
              placeholder="1122334444"
            />
            <CInput
              paddingVertical={20}
              value={form.phone}
              onChangeText={formChange("phone", true)}
              keyboardType="numeric"
              accessoryLeft={(props) => (
                <Icon {...props} name={"phone-outline"} />
              )}
              label="Phone (*)"
              placeholder="3884545"
            />
          </>
          <Toggle checked={checkResident} onChange={setCheckResident}>
            {"Register as a resident"}
          </Toggle>
          {checkResident && (
            <>
              <CInput
                paddingVertical={20}
                value={form.sector}
                onChangeText={formChange("sector")}
                label="Sector (*)"
                accessoryLeft={(props) => (
                  <Icon {...props} name={"home-outline"} />
                )}
                placeholder="F204"
              />
              <CInput
                paddingVertical={20}
                value={form.qr}
                onChangeText={() => null}
                accessoryLeft={(props) => (
                  <Icon {...props} name={"minus-square-outline"} />
                )}
                label="QR assigned"
                accessoryRight={(props) => (
                  <TouchableWithoutFeedback onPress={() => goQrCamera()}>
                    <CameraIcon
                      width={25}
                      height={25}
                      color={theme["color-primary-500"]}
                    />
                  </TouchableWithoutFeedback>
                )}
                placeholder="AGS123654"
              />
            </>
          )}
          <CButton
            onPress={() => onSend()}
            paddingVertical={20}
            text="Register"
          />
        </Panel>
      </Panel>
    </Panel>
  );
};
export default UsersRegister;

/**const theme = useTheme();
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
      return (newValue) => {
        if (isNum) {
          if (isNaN(newValue)) return;
        }
        const newobj = {};
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
    for (const key in form) {
      const element = form[key];
      if (element === "" && !optionals.includes(key)) {
        console.log(TAG, "element", key, "is empty");
        CAlertInfo("Complete Form", `The field ${key} is necesary`);
        return;
      }
    }
    if (form.sector === "" && checkResident) {
      CAlertInfo(
        "The field sector is empty",
        "Is needed sector value into the resident info.",
      );
      return;
    }
    const newResi = new ResidentType("", null, {
      name: form.name,
      sector: form.sector,
      idCard: form.idCard,
      qr: form.qr,
      telegram: "",
      phone: form.phone,
      profileImage: form.profileImage,
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
          null,
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
          null,
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
  }); */
