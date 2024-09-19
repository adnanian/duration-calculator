import { useTranslation } from "react-i18next"

export default function Loading() {
    const {t} = useTranslation();

    return <h1>{t("loading")}</h1>
}