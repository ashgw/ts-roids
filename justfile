alias h:= help
alias s:= setup
alias t:= test
alias l:= lint
alias b:= build
alias c:= clean
alias f:= format

@help:
    just --list

@hooks:
    pnpm hooks 
    

@setup:
    #!/bin/zsh
    source ~/.zshrc 
    nvm install 18.17.0 && nvm use 18.17.0
    pnpm i
    pnpm hooks


@build:
    pnpm build 

@test:
    pnpm test

@lint:
    pnpm lint

@format:
    pnpm format
    
@clean:
    rm -rf coverage dist 

@patch:
    rlls patch

@minor:
    rlls minor

@major:
    rlls major

@rollback:
    rlls rollback