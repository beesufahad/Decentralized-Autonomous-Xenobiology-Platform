;; Xeno Token Contract

(define-fungible-token xeno-token)

(define-data-var token-uri (string-utf8 256) u"")

(define-public (mint (amount uint) (recipient principal))
  (ft-mint? xeno-token amount recipient)
)

(define-public (transfer (amount uint) (sender principal) (recipient principal))
  (ft-transfer? xeno-token amount sender recipient)
)

(define-read-only (get-balance (account principal))
  (ok (ft-get-balance xeno-token account))
)

(define-public (set-token-uri (new-uri (string-utf8 256)))
  (ok (var-set token-uri new-uri))
)

(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

