import i18n from "@/i18n"
export function generateTitle(title: string) {
    return i18n.global.t("msg.route." + title)
}