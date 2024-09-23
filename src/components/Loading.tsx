import { useTranslation } from "react-i18next"

/**
 * Renders a heading with the title, "Loading..." in cases where the application
 * needs a little more time to load.
 * 
 * @returns a heading with the title, "Loading...".
 */
export default function Loading() {
    const { t } = useTranslation();

    return <h1>{t("loading")}</h1>
}