;; Xenobiology Design Contract

(define-data-var last-design-id uint u0)

(define-map designs
  { design-id: uint }
  {
    creator: principal,
    name: (string-ascii 50),
    description: (string-utf8 500),
    biochemistry: (string-ascii 100),
    genetic-code: (string-utf8 1000),
    status: (string-ascii 20)
  }
)

(define-public (create-design (name (string-ascii 50)) (description (string-utf8 500)) (biochemistry (string-ascii 100)) (genetic-code (string-utf8 1000)))
  (let
    (
      (new-id (+ (var-get last-design-id) u1))
    )
    (map-set designs
      { design-id: new-id }
      {
        creator: tx-sender,
        name: name,
        description: description,
        biochemistry: biochemistry,
        genetic-code: genetic-code,
        status: "draft"
      }
    )
    (var-set last-design-id new-id)
    (ok new-id)
  )
)

(define-public (update-design (design-id uint) (name (string-ascii 50)) (description (string-utf8 500)) (biochemistry (string-ascii 100)) (genetic-code (string-utf8 1000)))
  (let
    (
      (design (unwrap! (map-get? designs { design-id: design-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get creator design)) (err u403))
    (ok (map-set designs
      { design-id: design-id }
      (merge design { name: name, description: description, biochemistry: biochemistry, genetic-code: genetic-code })
    ))
  )
)

(define-public (submit-for-simulation (design-id uint))
  (let
    (
      (design (unwrap! (map-get? designs { design-id: design-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get creator design)) (err u403))
    (asserts! (is-eq (get status design) "draft") (err u400))
    (ok (map-set designs
      { design-id: design-id }
      (merge design { status: "submitted" })
    ))
  )
)

(define-read-only (get-design (design-id uint))
  (ok (map-get? designs { design-id: design-id }))
)

