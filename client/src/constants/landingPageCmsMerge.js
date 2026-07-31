export function mergeListByIndex(defaultList = [], apiList) {
  if (!Array.isArray(apiList) || apiList.length === 0) return defaultList
  const maxLen = Math.max(defaultList.length, apiList.length)
  const merged = []
  for (let i = 0; i < maxLen; i++) {
    merged.push({ ...(defaultList[i] || {}), ...(apiList[i] || {}) })
  }
  return merged
}

export function mergeLandingPageCms(defaults, apiData, listSectionKeys = {}) {
  if (!apiData) return defaults
  const apiSections = apiData.sections || {}
  const mergedSections = { ...defaults.sections }

  Object.keys(defaults.sections).forEach((sectionKey) => {
    const defSection = defaults.sections[sectionKey] || {}
    const apiSection = apiSections[sectionKey] || {}
    mergedSections[sectionKey] = { ...defSection, ...apiSection }

    const listKeys = listSectionKeys[sectionKey]
    if (!listKeys) return
    const keys = Array.isArray(listKeys) ? listKeys : [listKeys]
    keys.forEach((listKey) => {
      mergedSections[sectionKey][listKey] = mergeListByIndex(
        defSection[listKey] || [],
        apiSection[listKey]
      )
    })
  })

  return {
    pageTitle: apiData.pageTitle || defaults.pageTitle,
    metaDescription: apiData.metaDescription || defaults.metaDescription,
    sections: mergedSections,
  }
}
