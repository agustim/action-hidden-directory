# Hidden directory
Simplre hidden directory with index.html to protect your web pages.

Based in 'hello-world javascript action'

## Inputs

### `password`

**Required** This is password to use for find directory. Default `"SuperSecret"`.

## Outputs

### `sharekey`

Random key to add password to calculate hidden directory.

### `directory`

Directory to random hidden.

## Example usage
```
uses: agustim/action-hidden-directory@v1
with:
  password: 'MySecret'
```