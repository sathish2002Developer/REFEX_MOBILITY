/**
 * Merge CMS list items.
 * When the API provides an array (including empty), that list is the source of truth
 * so admin add/remove persists on the website after refresh.
 * Missing/undefined apiList falls back to defaults.
 */
export function mergeListByIndex(defaultList = [], apiList) {
  if (!Array.isArray(apiList)) return defaultList
  return apiList.map((item, index) => ({
    ...(item || {}),
    order: index + 1,
  }))
}

function mergeSectionScalars(defSection = {}, apiSection = {}) {
  const merged = { ...defSection }
  Object.keys(apiSection).forEach((key) => {
    const apiVal = apiSection[key]
    const defVal = defSection[key]
    // Don't let accidental empty CMS strings wipe default headings/copy.
    if (
      typeof apiVal === 'string' &&
      apiVal.trim() === '' &&
      typeof defVal === 'string' &&
      defVal.trim() !== ''
    ) {
      return
    }
    if (apiVal !== undefined) merged[key] = apiVal
  })
  return merged
}

export function mergeLandingPageCms(defaults, apiData, listSectionKeys = {}) {
  if (!apiData) return defaults
  const apiSections = apiData.sections || {}
  const mergedSections = { ...defaults.sections }

  Object.keys(defaults.sections).forEach((sectionKey) => {
    const defSection = defaults.sections[sectionKey] || {}
    const apiSection = apiSections[sectionKey]
    const hasApiSection = apiSection && typeof apiSection === 'object' && !Array.isArray(apiSection)

    mergedSections[sectionKey] = hasApiSection
      ? mergeSectionScalars(defSection, apiSection)
      : { ...defSection }

    const listKeys = listSectionKeys[sectionKey]
    if (!listKeys) return
    const keys = Array.isArray(listKeys) ? listKeys : [listKeys]
    keys.forEach((listKey) => {
      const hasApiList =
        hasApiSection && Object.prototype.hasOwnProperty.call(apiSection, listKey)

      // logos.items: saved array always wins (including empty). Never pad from defaults.
      if (sectionKey === 'logos' && listKey === 'items' && hasApiList) {
        const apiList = apiSection[listKey]
        mergedSections[sectionKey][listKey] = Array.isArray(apiList)
          ? apiList.map((item, index) => ({
              ...(item || {}),
              order: index + 1,
            }))
          : []
        return
      }

      mergedSections[sectionKey][listKey] = mergeListByIndex(
        defSection[listKey] || [],
        hasApiList ? apiSection[listKey] : undefined
      )
    })
  })

  return {
    pageTitle: apiData.pageTitle || defaults.pageTitle,
    metaDescription: apiData.metaDescription || defaults.metaDescription,
    sections: mergedSections,
  }
}
