import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {
  const provider = vscode.languages.registerCompletionItemProvider(
    { scheme: "file" },
    {
      provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
        const now = new Date()
        const today = new vscode.CompletionItem("today")
        today.insertText = dateToString(now)
        today.documentation = "Prints today in the format yyyy-mm-dd."

        const tomorrow = new vscode.CompletionItem("tomorrow")
        tomorrow.insertText = dateToString(new Date(now.setDate(now.getDate() + 1)))
        tomorrow.documentation = "Prints tomorrow in the format yyyy-mm-dd."

        return [today, tomorrow]
      }
    }
  )

  context.subscriptions.push(provider)
}

function dateToString(d: Date): string {
  let m = d.getMonth() + 1
  const month = m < 10 ? "0" + m : m
  const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}
