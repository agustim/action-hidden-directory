# Hidden directory
This is a simple system to hidden content over static page environment.
The main idea is move the content to the folder with its name is hashing with random string and password, the random string is generated when action is executed. Also, action, make a static page with ask password and calculate the redirect.
This Action is based in 'hello-world javascript action'


Un sistema simple d'amagar contingut utilitzant en un entorn de pàgines estàtiques.
L'idea principal és que es mou el contingut a una carpeta on el seu nom és el hash d'una clau de pas més una cadena aleatoria, 
que es genera al ser cridada l'action. Es genera una pàgina estàtica que et demana una clau i fa el calcul amb la seva redirecció.
Aquest Action està basada en 'hello-world javascript action'

## Update v1.2
```
Change clent_template to use form.

```

## Inputs

### `password`

**Required** This is password to use for find directory. Default `"SuperSecret"`.

## Outputs

### `sharekey`

Random key to add password to calculate hidden directory.

### `directory`

Directory to random hidden.

## Example usage

Public in github pages

```
  - name: Generate hidden directory
    uses: agustim/action-hidden-directory@v1.2
    id: hidden
    with:
      password: Secret@Super
... [ Build in ./out ] ...
  - name: Prepare Deploy
    run: |
      mkdir -p ./client
      mv ./out ./client/${{ steps.hidden.outputs.directory }}
  - name: Deploy to gh-pages
    uses: peaceiris/actions-gh-pages@v3
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      publish_dir: ./client
```
This [example](https://github.com/agustim/test-action-hidden-directory) is based in [nextjs](https://nextjs.org/). 
## Build own client
If you want to change landing page of project, you can change ```client_template``` folder with your content and execute ```yarn run build``` 

