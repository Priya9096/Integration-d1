from rest_framework.permissions import BasePermission
from rest_framework.permissions import SAFE_METHODS


class IsSellerOrReadOnly(BasePermission):

    def has_permission(self, request, view):

        # rule 1 — safe methods always pass
        if request.method in SAFE_METHODS:
            return True

        # rule 2 — must be a logged-in seller
        return (
            request.user.is_authenticated
            and request.user.user_type == 'seller'
        )
