module.exports = {
  git: {
    requireCleanWorkingDir: false,
    commit: false,
    pushArgs: ['--tags']
  },
  github: {
    release: true,
    autoGenerate: true
  },
  npm: {
    ignoreVersion: true,
    publish: false,
    skipChecks: true
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preMajor: true,
      whatBump: (commits, options) => {
        let defaults = {
          build: 'ignore',
          chore: 'patch',
          ci: 'ignore',
          docs: 'ignore',
          feat: 'minor',
          fix: 'patch',
          perf: 'patch',
          refactor: 'patch',
          style: 'ignore',
          test: 'ignore'
        }
        let types = (options?.preset?.types || []).reduce((a, v) => {
          return { ...a, [v.type]: v.release }
        }, {})

        types = Object.assign({}, defaults, types)
        let breakings = 0
        let features = 0
        let levelSet = ['major', 'minor', 'patch', 'ignore']
        let level = Math.min.apply(
          Math,
          commits.map((commit) => {
            let level = levelSet.indexOf(types[commit.type])
            level = level < 0 ? 3 : level
            if (commit.notes.length > 0) {
              breakings += commit.notes.length
              level = 0
            }
            if (commit.type === 'feat') {
              features += 1
            }
            return options.preMajor && level < 2 ? level + 1 : level
          })
        )

        return {
          level: level,
          reason:
            breakings === 1
              ? `There is ${breakings} BREAKING CHANGE and ${features} features`
              : `There are ${breakings} BREAKING CHANGES and ${features} features`
        }
      },
      preset: {
        // used in the whatBump function above to override defaults
        name: 'conventionalcommits',
        types: [
          {
            type: 'ci',
            release: 'patch'
          }
        ]
      }
    }
  }
}
