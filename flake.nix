{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          shellHook = "nu";

          LD_LIBRARY_PATH = "$LD_LIBRARY_PATH:${
            with pkgs;
            lib.makeLibraryPath [
              stdenv.cc.cc.lib
            ]
          }";

          packages = with pkgs; [
            bun
            biome
            nodePackages."@astrojs/language-server"
          ];
        };
      }
    );
}
