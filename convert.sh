
# Placeholders in forms
perl -i -p -e 's/(label|placeholder)="(.+)"/$1={t(\x27$2\x27)}/g' ./package/src/components/*/v1/*.js

# Text in "HTML"
perl -i -p -e 's/>\{(.+Text)}</>\{t($1)}</g' ./package/src/components/*/v1/*.js

# Include i18n
# Add a line below the i18n import - add a comment so the script can be run multiple times
# without issues (quick and dirty solution - a regex can solve this)
perl -i -p -e 's/^(import React.+;)\n$/$1 \/\/ auto-add i18n \nimport i18n from "..\/..\/..\/utils";\n/' ./package/src/components/*/v1/*.js

# Wrap the translation
perl -i -p -e 's/export default (.+);$/export default i18n.withTranslation()($1); \/\/ auto-add i18n/g' ./package/src/components/*/v1/*.js

#
# https://react.i18next.com/latest/withtranslation-hoc#overriding-the-i-18-next-instance
#