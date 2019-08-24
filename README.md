# semantic-release-plugin-csproj
.NET Core plugin for semantic-release

### Example .releaserc.json
```json
{
  "branch": "master",
  "plugins": [
    "@semantic-release/release-notes-generator",
    ["semantic-release-plugin-csproj", {
      "projectFile": "someProject.csproj"
    }],
    "@semantic-release/changelog",
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md", "**/*.csproj"]
    }]
  ]
}
